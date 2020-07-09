#!/bin/bash
set -x

`dirname $0`/web_rsync_pkey.exp 123.207.60.180 ubuntu "~/Documents/keys/lianrong.txt" 22 `dirname $0`/../../dist /data/xn-lr-web -1
