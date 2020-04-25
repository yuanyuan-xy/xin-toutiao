import request from '@/utils/request'
// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
// 获取文章频道
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
// 删除文章
export const delArticle = delId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${delId}`
  })
}
// 新增文章
export const addArticle = (data, draft) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}
// 获取文章详细资料
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
// 编辑文章
export const editArticle = (articleId, data, draft) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}
