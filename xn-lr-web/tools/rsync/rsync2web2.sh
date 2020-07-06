#!/bin/bash
set -x

`dirname $0`/web_rsync_pkey.exp 139.199.225.131 ubuntu "~/Documents/keys/lianrong.txt" 22 `dirname $0`/../../dist /data/xn-lr-web -1
