const { execSync } = require('child_process')

function getGitInfo() {
  if (
    process.env.GIT_CUR_COMMIT &&
    process.env.GIT_CUR_AUTHOR &&
    process.env.GIT_CUR_BRANCH_NAME
  ) {
    return {
      revision: (process.env.GIT_CUR_COMMIT || 'unknown').trim(),
      author: (process.env.GIT_CUR_AUTHOR || 'unknown').trim(),
      msg: (process.env.GIT_CUR_MSG || '').trim(),
      branch: (process.env.GIT_CUR_BRANCH_NAME || '').trim(),
    }
  }

  try {
    const revision = execSync('git rev-parse HEAD').toString().trim()
    const author = execSync(`git log --pretty=format:%an ${revision}  -1`)
      .toString()
      .trim()
    const msg = execSync(`git log --pretty=format:%s ${revision}  -1`)
      .toString()
      .trim()

    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()

    return {
      revision: revision || 'unknown',
      author: author || 'unknown',
      branch: branch || 'unknown',
      msg: msg || '',
    }
  } catch (err) {
    console.error(err)
  }
  return {
    revision: 'unknown',
    author: 'unknown',
    branch: 'unknown',
    msg: '',
  }
}

module.exports = getGitInfo
