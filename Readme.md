
# httpipe

  pipe to http and back

## Installation

  Install with npm

    $ npm -g install jb55/httpipe

## Commands

  Pipe to httpipe.io

    $ curl -X POST -d@- http://httpipe.io/myfile.txt < myfile.txt
    $ # ... sleeps waiting for receiver

  Receive from anywhere else

    $ curl http://httpipe.io/myfile.txt
    $ # POST finishes after GET 

  Handy cli tools for httpipe. curl doesn't do streaming `POST`S well so
  its recommended you use `httpipe post` when `POST`ing.

    $ echo "hi" | httpipe post jb55/myfile.txt

    $ httpipe http://httpipe.io/jb55/myfile.txt
  

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
