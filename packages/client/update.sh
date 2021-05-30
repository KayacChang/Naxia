#!/bin/sh

sed -i '' -e "s/REACT_APP_VERSION=$PARTITION_COLUMN.*/REACT_APP_VERSION=$(git describe --abbrev=0 --tags)/g" .env