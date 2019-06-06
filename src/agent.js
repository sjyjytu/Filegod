const requests = require('superagent');

const API_ROOT = 'http://47.103.0.246:12580';

const Files = {
    upload: (title, author, file, description) =>
        requests.post(API_ROOT + '/files/upload')
            .attach('file', file)
            .field('title', title)
            .field('author', author)
            .field('description', description)
            .then(res => res.body),

    download: (file_id) =>
        requests.get(API_ROOT + '/files/download')
            .query({ file_id })
}

const Links = {
    upload: (title, author, link, description) =>
        requests.post(API_ROOT + '/files/upload')
            .send({ title, author, link, description })
            .then(res => res.body),
}

const Contents = {
    show: () => requests.get(API_ROOT + '/contents/get')
        .then(res => res.body),
}

export default {
    Files,
    Links,
    Contents,
}
