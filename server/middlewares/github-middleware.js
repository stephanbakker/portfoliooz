export default function githubMiddleware(req, res, next) {
  console.log('headers from github', req.headers);
  // console.log('payload from github', req.body);
  req.githubUpdate = req.get('X-GitHub-Event') !== undefined;
  next();
}
