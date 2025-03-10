#!/bin/bash

# https://github.com/signalwerk/colorlab/blob/master/deploy_doc.sh
# https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
# https://github.com/steveklabnik/automatically_update_github_pages_with_travis_example

set -e # Exit with nonzero exit code if anything fails

echo "-- start"
ls -las

SOURCE_BRANCH="master"
TARGET_BRANCH="master"
SSH_REPO="git@github.com:ricard33/react-calendar-timeline-docs"
DEPLOY_DIR="gh-pages"

function doCompile {
  # npm test
  # npm run build
  echo "-- doCompile"
  yarn
  yarn run build:demo

  mkdir -p $DEPLOY_DIR/
  cp ./build/* ./$DEPLOY_DIR/
}

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy;"
    exit 0
fi

# Get the deploy key by using Travis's stored variables to decrypt deploy-travis-key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
eval `ssh-agent -s`
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ./deploy-travis-key.enc -d | ssh-add -

# Save some useful information
# REPO=`git config remote.origin.url`
# SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

# Clone the existing gh-pages for this repo into $DEPLOY_DIR/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deply)
rm -rf $DEPLOY_DIR
git clone $SSH_REPO $DEPLOY_DIR
cd $DEPLOY_DIR
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
echo "-- kill"
echo $DEPLOY_DIR
rm -rf $DEPLOY_DIR/* || exit 0

# Run our compile script
doCompile

# Now let's go have some fun with the cloned repo
cd $DEPLOY_DIR
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if git diff --quiet; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add -A .
git commit -m "Deploy to GitHub Pages: ${SHA}"

# Push to the remote repository
git push $SSH_REPO $TARGET_BRANCH
