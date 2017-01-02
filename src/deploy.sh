#!/bin/bash
set -eu

/usr/local/bin/kubectl --namespace=spotify set image deployments/spotify spotify=cescoferraro/spotify:${VERSION}