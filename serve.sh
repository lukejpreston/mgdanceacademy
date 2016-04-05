for port in $(seq 4444 65000); do echo -ne "\035" | telnet 127.0.0.1 $port > /dev/null 2>&1; [ $? -eq 1 ] && break; done

if [ -e jekyll.pid ]
then
    kill -9 `cat jekyll.pid`
    rm jekyll.pid
fi

clear

export JEKYLL_ENV=dev
bundle exec jekyll serve --watch --port $port &

echo $! > jekyll.pid
echo "Started: " `date`