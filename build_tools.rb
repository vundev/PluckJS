class BuildTools
  
  def initialize()
    raise '' + self.class.name + ' is a static class.'
  end

  def self.excludeSrc(path_to_file, block)
    file = File.open(path_to_file)
    data = file.read
    file.close()

    openTag = '//<' + block + '>'
    closeTag = '//</' + block + '>'

    chunks = data.split(closeTag)
    output = ''
    chunks.each{|body|
      output = output + body.split(openTag)[0]
    }
    return output
  end
  
  # Creates file from specified content
  def self.save(wath, to)
    file = File.new(to, 'w')
    file.puts(wath)
    file.close()
  end
  
  # Read file on the local system or url
  def self.read(url)
    open(url) { |f| return f.read }
  end
  
  # Copy a dir(recursively) to a pointed destination
  def self.copy(dir, dest)
    files = Dir.glob(dir + '/*')
    self.create_path(dest)
    FileUtils.cp_r files, dest
  end
  
  # Copy the file from the selected path to the specified destination
  def self.copy_f(path, dest)
    file = File.open(path)
    self.create_path(dest)
    FileUtils.cp_r file, dest
    file.close()
  end
  
  # Creates path from nested directories
  def self.create_path(path)
    dir = ''
    path.split('/').each{|folder|
      dir += folder + '/'
      if !Dir.exists?(dir)
        FileUtils.mkdir dir
      end
    }
  end
end

