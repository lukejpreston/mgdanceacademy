if [ -e jekyll.pid ]
then
    kill -9 `cat jekyll.pid`
    rm jekyll.pid
fi

clear

export JEKYLL_ENV=dev
bundle exec jekyll serve --watch &

echo $! > jekyll.pid
echo "Started: " `date`