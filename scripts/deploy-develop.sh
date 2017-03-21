#!/bin/bash

set -ev

tar -czf _book.tgz _book
scp _book.tgz $DEVELOP_USER@$DEVELOP_HOST:$DEVELOP_DIR
