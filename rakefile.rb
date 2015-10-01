#encoding: utf-8
require 'json'
require 'open-uri'
require 'net/sftp'
root = File.dirname(__FILE__) + '/'
require root + 'build_tools'
require root + 'deploy_tools'

credentials = JSON.parse(IO.read('credentials.json'))
deployDefaultCredentials = credentials['devel']
=begin
task :test do |t|
  uploader = DeployTools.new(nil)
  def callback(isFileOrDir, entity)
    p (isFileOrDir ? 'dir ' : 'file ') + entity
    p entity['bin'.length...entity.length]
  end
  uploader.traverse('bin', method(:callback))
end
=end
task :clean do |t|
  FileUtils.rm_rf(Dir.glob('bin/*'))
end

task :default do |t|
  # Merge pluck src with app src
  config = JSON.parse(IO.read('config.json'))
  app_config = JSON.parse(IO.read('app_config.json'))
  position = config.length - 1
  app_config.each_with_index { |e, i|
    config.insert(position + i, e)
  }
  
  BuildTools.save(BuildTools.excludeSrc('compiler_options.js', 'debug'), 'bin/compiler_options.js')
  
  BuildTools.copy_f('index.html', 'bin')
  
  css_output = ''
  js_output = ''
  config.each {|item|  
    if item['paralel']
      item['paralel'].each { |paralel|
        temp = parse_js_or_css_file(paralel)
        if paralel['type'] == 'css'
          css_output += temp
        else
          js_output += temp 
        end        
      }
    else
      temp = parse_js_or_css_file(item)
      if item['type'] == 'css'
        css_output += temp
      else
        js_output += temp 
      end   
    end   
  }
  
  js_output += parse_js_or_css_file({"src"=> 'project.js', "compress"=> true})
  
  BuildTools.save(css_output, 'bin/project.css')
  BuildTools.save(js_output, 'bin/project.js')
  
  BuildTools.copy('assets', 'bin/assets')
end

def parse_js_or_css_file(options)
  p '--------------------------------------------------------------'
  p options['src'] + ' compress=' + options['compress'].to_s()  
  
  buildOptions = JSON.parse(File.read('build_options.json'))
  buildCSSCommand = '"' + buildOptions['pathToJava'] + '" -jar ' + buildOptions["pathToCSSCompiler"] + ' -o bin\\temp-output.css bin\\temp.css'
  buildJSCommand =  '"' + buildOptions['pathToJava'] + '" -jar ' + buildOptions["pathToJSCompiler"] + ' --js bin\\temp.js --js_output_file bin\\temp-output.js'
  
  if options['compress']
    ext = options['type'] == 'css' ? 'css' : 'js'
    temp = File.new('bin/temp.' + ext, 'w')  
    temp.write(ext == 'js' ? BuildTools.excludeSrc(options['src'], 'debug') : BuildTools.read(options['src']) )
    temp.close()
    system(ext == 'css' ? buildCSSCommand : buildJSCommand)
    temp = File.open('bin/temp-output.' + ext, 'r')
    output = temp.read
    temp.close()
    # Deletes temp files
    FileUtils.rm_rf('bin/temp.' + ext)
    FileUtils.rm_rf('bin/temp-output.' + ext)
    return output + "\n"
  end
  return BuildTools.read(options['src']) + "\n"
end

task :deploy, [:options] do |t, args|
  deployDefaultCredentials['host'] = ENV['host'] || deployDefaultCredentials['host']
  deployDefaultCredentials['usern'] = ENV['usern'] || deployDefaultCredentials['usern']
  deployDefaultCredentials['port'] = ENV['port'] || deployDefaultCredentials['port']
  deployDefaultCredentials['pass'] = ENV['pass'] || deployDefaultCredentials['pass']
  deployDefaultCredentials['root'] = ENV['root'] || deployDefaultCredentials['root']
  deployDefaultCredentials = deployDefaultCredentials.merge(args.options || {} )
  Net::SFTP.start(deployDefaultCredentials['host'], deployDefaultCredentials['usern'], :port => deployDefaultCredentials['port'], :password => deployDefaultCredentials['pass']) do |sftp|
    uploader = DeployTools.new(sftp)
    uploader.upload('bin', deployDefaultCredentials['root'])
  end
end
