# TStar

### What is this?

This app allows you to view the top Toronto Star articles on your phone whilst offline. Its specific goal is to allow users to read the Toronto Star while commuting to and from work with no cellular connection.

URL: http://tstar.com.s3-website.ca-central-1.amazonaws.com

### Local Dev

1. `git clone https://github.com/themarkappleby/tstar.git`
1. `npm install`
1. `npm start`

### Scripts

- `npm run start`: Fetch latest articles, build and push an updated version of the app to S3.
- `npm run build`: Build and push based on a previously fetched `data.json` file.
- `npm run upload`: Upload the latest build assets to S3.
- `npm run zip`: Removes `aws-sdk` and zips up project for Lambda.
