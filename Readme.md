
# httpipe

  pipe to http and back

## Installation

  Install with npm

    $ npm -g install jb55/httpipe

## Commands

### Human friendly cli tools

  Handy cli tools for httpipe. curl doesn't do streaming `POST`S well so
  its recommended you use `httpipe post` when `POST`ing.

    $ echo "hi" | httpipe jb55/myfile.txt

    $ httpipe jb55/myfile.txt
    hi

### Using CURL works!

  POST until someone GETs the resource

    $ curl -X POST -d@- http://httpipe.io/myfile.txt < myfile.txt

### Receive from anywhere else

  The original POST finishes after doing a GET on the resource

    $ curl http://httpipe.io/myfile.txt

### Run your own httpipe server

    $ httpiped

### Configuring custom httpipe url

  Add this to your environment:

```bash
export HTTPIPE_URL=http://myhttpiped.com
```

  httpipe commands will use this endpoint when doing requests:

  `httpipe myfile.txt` will expand to `httpipe http://myhttpiped.com/myfile.txt`

## API

```javascript
var httpiped = require('httpipe')

// express app
app.listen(8000);
```

## License

  The MIT License (MIT)

  Copyright (c) 2014 William Casarin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
