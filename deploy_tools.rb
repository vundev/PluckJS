class DeployTools

  @ftp = nil
  
  def initialize(ftp)
    @ftp = ftp
  end
  
=begin
  Traverse recursively a local folder's child folders.
  @param root The path to the local root folder which will be traversed  
  @param callback A function receiving parameters - full path to the currently traversed folder from the root folder; a reference to the DeployTools object.
  callbak(this, path/to/current_folder)
=end
  def traverse(root, callback = nil)
    Dir.glob(root + '/*').each{|entity|
      isFileOrDir = Dir.exists?(entity) ? true : false
      if callback != nil
          callback.call(isFileOrDir, entity)
      end
      self.traverse(entity, callback)
    }
  end
  
=begin
  @param path String representation of nested folders: folder1/folder2/folder3/... which will be created on the remote server's root folder.
=end
  def create_path(path)  
    folders = path.split('/')
    length = folders.length - 1
    nextDir = folders[0]
    for i in 0..length
      begin
        parentDir = nextDir
        childDir = parentDir + '/' + folders[i]
        nextDir = childDir
        puts 'mkdir ' + childDir + ' in ' + parentDir
        @ftp.mkdir(childDir) if !@ftp.list(parentDir).any?{|dir| dir.match(/\s#{folders[i]}$/)}
      rescue Exception => error
        puts '[WARNING] ' + error.to_s()
      end
    end
  end
  
  def external_dir_exist(path)
    begin
      return @ftp.lstat!(path).directory?
    rescue Exception => e
      return false
    end
    return false
  end
  
  def upload(local, remote) 
    callback = Proc.new do |isFileOrDir, entity|
      relativePath = entity[local.length...entity.length]
      if !isFileOrDir 
        @ftp.upload!(entity, remote + relativePath)
      elsif !self.external_dir_exist(remote + relativePath)
        @ftp.mkdir(remote + relativePath)
      end
    end
    self.traverse(local, callback)    
  end
end
