/* eslint-disable import/prefer-default-export */
// import url from 'js-url';

const JOBDOOR_BASE_URL = process.env.VUE_APP_JOBDOOR_BACKEND_URL;

export async function createImage(
  idToken,
) {
  const reply = await fetch(
    `${JOBDOOR_BASE_URL}/imageurl`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    },
  );

  return reply.json();
}

export async function uploadFile(idToken, file) {
  const urlResponse = await createImage(idToken);
  console.log(urlResponse);
  console.log(file);
  try {
    await fetch(urlResponse.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': 'image/*',
      },
    });
    // const hostName = await url('hostname', urlResponse.uploadUrl);
    // const path = await url('path', urlResponse.uploadUrl);
    // const imageurl = `https://${hostName}${path}`;
    // console.log('imageurl', imageurl);
    // return new Promise(imageurl);
  } catch (err) {
    throw new Error(err);
  }
}

export async function saveUser(user, idToken) {
  const saveUserUrl = `${JOBDOOR_BASE_URL}\\user`;
  console.log(JOBDOOR_BASE_URL);
  try {
    await fetch(saveUserUrl, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
}


export async function savePost(post, idToken) {
  const savePostUrl = `${JOBDOOR_BASE_URL}\\jobpost`;
  console.log(JOBDOOR_BASE_URL);
  try {
    await fetch(savePostUrl, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
}

export async function getPosts(locationCode, idToken) {
  const url = new URL(`${JOBDOOR_BASE_URL}jobposts`);
  const params = [['locationId', locationCode]];
  url.search = new URLSearchParams(params).toString();
  const reply = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return reply.json();
}

export async function getUser(idToken) {
  const url = new URL(`${JOBDOOR_BASE_URL}user`);
  const reply = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return reply.json();
}


export async function getAppliedJobPosts(userType, idToken) {
  const url = new URL(`${JOBDOOR_BASE_URL}jobposts`);
  const params = [['userType', userType]];
  url.search = new URLSearchParams(params).toString();
  const reply = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return reply.json();
}

export async function editJobPost(editJobPostReq, idToken) {
  const url = new URL(`${JOBDOOR_BASE_URL}jobpost/edit`);
  const reply = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(editJobPostReq),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return reply.json();
}


export async function getCandidates(jobId, idToken) {
  const url = new URL(`${JOBDOOR_BASE_URL}candidates`);
  const params = [['postId', jobId]];
  url.search = new URLSearchParams(params).toString();
  const reply = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return reply.json();
}

export async function deletePost(jobId, idToken) {
  const url = new URL(`${JOBDOOR_BASE_URL}jobpost/${jobId}`);
  const reply = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return reply.json();
}


export async function applyForJob(request, idToken) {
  const url = new URL(`${JOBDOOR_BASE_URL}jobpost`);
  const reply = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return reply.json();
}
