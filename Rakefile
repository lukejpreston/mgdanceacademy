require 'rake'
require 'jekyll'
require 'json'

desc "Sets up a new You Eye project"
task :setup do
    puts "What is the name of your project?"
    name = STDIN.gets.strip

    File.open("#{name}.sublime-project", 'w') do |f|
        f.puts JSON.pretty_generate({:folders => [{:name => name, :path => ".", :folder_exclude_patterns => ["_site", ".sass-cache", ".you_eye"], :file_exclude_patterns => ["Gemfile.lock"]}]})
    end

    # clone everything from you_eye into a .you_eye then copy everything in there out

end

desc "Update You Eye project (it is destructive)"
task :update do
    # clone everything from you_eye into a .you_eye then copy everything in there out
    puts "update"
end

desc "Create a new page"
task :page do
    puts "What is the name of your page?"
    page = STDIN.gets.strip
end

desc "Create a new post"
task :post do
    puts "What is the name of your post?"
    post = STDIN.gets.strip
end

desc "Starts and watches your project"
task :serve do
   system "bundle exec jekyll serve --watch"
end