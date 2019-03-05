import Axios from 'axios'

import config from './config'

const http = Axios.create({
  baseURL: config.endpoint,
  headers: {
    Authorization: `bearer ${config.token}`
  }
})

http.interceptors.response.use((response) => {
  const { data, error } = response.data
  if (error) throw new Error(JSON.stringify(error))
  return data
})

const apis = {
  getUser(user: string) {
    return http.post('', {
      query: `
        query ($user: String!) {
          user(login: $user) {
            id
            url
            name
            avatarUrl
            bio
          }
        }
      `,
      variables: {
        user
      }
    })
  },
  listIssues(owner: string, repository: string, size: number, cursor?: string) {
    return http.post('', {
      query: `
        query ($owner: String!, $repository: String!, $size: Int!, $cursor: String) {
          repository(owner: $owner, name: $repository) {
            issues(states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}, first: $size, after: $cursor) {
              pageInfo {
                endCursor
                hasNextPage
              }
              nodes {
                id
                title
                createdAt
                authorAssociation
                author {
                  login
                }
                comments {
                  totalCount
                }
                labels(last: 3) {
                  nodes {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        owner,
        repository,
        size,
        cursor
      }
    })
  }
}

export default apis
