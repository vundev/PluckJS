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
      # checks whether an entity is file or directory
      if Dir.exists?(entity)     
        puts 'traverse ' + entity
        if callback != nil
          callback.call(self, entity)
        end
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
end
