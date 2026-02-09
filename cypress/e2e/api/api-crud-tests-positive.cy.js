/// <reference types="cypress" />

// Typicode API Testing
// Base URL for Typicode API
const baseUrl = Cypress.config('ApiBaseUrl')

let createdPostId

describe('Typicode API CRUD Tests', { tags: ['@api'] }, () => {

    context('CREATE Operations', () => {

        it('Should CREATE a new post', { tags: ['@smoke'] }, () => {
            const newPost = {
                title: 'foo',
                body: 'bar',
                userId: 1
            }

            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: newPost,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body.title).to.eq(newPost.title)
                expect(response.body.body).to.eq(newPost.body)
                expect(response.body.userId).to.eq(newPost.userId)
                createdPostId = response.body.id
                cy.log(`Created post with ID: ${createdPostId}`)
            })
        })

        it('Should CREATE a post with dynamic data', () => {
            const timestamp = Date.now()
            const dynamicPost = {
                title: `Test Post ${timestamp}`,
                body: `This is a test post created at ${timestamp}`,
                userId: 1
            }

            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: dynamicPost,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('id', 101)
                expect(response.body.title).to.eq(dynamicPost.title)
                expect(response.body.body).to.eq(dynamicPost.body)
            })
        })
    })

    context('READ Operations', () => {

        it('Should GET a single post by ID', { tags: ['@smoke'] }, () => {
            const postId = 1

            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/${postId}`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', postId)
                expect(response.body).to.have.property('title')
                expect(response.body).to.have.property('body')
                expect(response.body).to.have.property('userId')
            })
        })

        it('Should GET all posts', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body).to.have.length(100)
                expect(response.body[0]).to.have.property('id')
                expect(response.body[0]).to.have.property('title')
            })
        })

        it('Should GET posts filtered by userId', () => {
            const userId = 1

            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts?userId=${userId}`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body.length).to.be.greaterThan(0)
                response.body.forEach(post => {
                    expect(post.userId).to.eq(userId)
                })
            })
        })

        it('Should GET nested comments for a post', () => {
            const postId = 1

            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/${postId}/comments`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body.length).to.be.greaterThan(0)
                response.body.forEach(comment => {
                    expect(comment).to.have.property('postId', postId)
                    expect(comment).to.have.property('id')
                    expect(comment).to.have.property('email')
                    expect(comment).to.have.property('body')
                })
            })
        })

        it('Should GET comments filtered by postId', () => {
            const postId = 1

            cy.api({
                method: 'GET',
                url: `${baseUrl}/comments?postId=${postId}`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                response.body.forEach(comment => {
                    expect(comment.postId).to.eq(postId)
                })
            })
        })
    })

    context('UPDATE Operations', () => {

        it('Should UPDATE a post using PUT method', { tags: ['@smoke'] }, () => {
            const postId = 1
            const updatedPost = {
                id: postId,
                title: 'Updated Title',
                body: 'Updated Body Content',
                userId: 1
            }

            cy.api({
                method: 'PUT',
                url: `${baseUrl}/posts/${postId}`,
                body: updatedPost,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.id).to.eq(postId)
                expect(response.body.title).to.eq(updatedPost.title)
                expect(response.body.body).to.eq(updatedPost.body)
                expect(response.body.userId).to.eq(updatedPost.userId)
            })
        })

        it('Should PATCH a post (partial update)', () => {
            const postId = 1
            const patchData = {
                title: 'Patched Title Only'
            }

            cy.api({
                method: 'PATCH',
                url: `${baseUrl}/posts/${postId}`,
                body: patchData,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id', postId)
                expect(response.body.title).to.eq(patchData.title)
                expect(response.body).to.have.property('body')
                expect(response.body).to.have.property('userId')
            })
        })

        it('Should UPDATE multiple fields using PATCH', () => {
            const postId = 5
            const patchData = {
                title: 'New Title',
                body: 'New Body'
            }

            cy.api({
                method: 'PATCH',
                url: `${baseUrl}/posts/${postId}`,
                body: patchData,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.title).to.eq(patchData.title)
                expect(response.body.body).to.eq(patchData.body)
            })
        })
    })

    context('DELETE Operations', () => {

        it('Should DELETE a post', { tags: ['@smoke'] }, () => {
            const postId = 1

            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/posts/${postId}`
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Should DELETE multiple posts sequentially', () => {
            const postIds = [1, 2, 3]

            postIds.forEach(postId => {
                cy.api({
                    method: 'DELETE',
                    url: `${baseUrl}/posts/${postId}`
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    cy.log(`Deleted post with ID: ${postId}`)
                })
            })
        })
    })

    context('Additional Resources Tests', () => {

        it('Should GET all users', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/users`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body.length).to.eq(10)
                expect(response.body[0]).to.have.property('id')
                expect(response.body[0]).to.have.property('name')
                expect(response.body[0]).to.have.property('email')
            })
        })

        it('Should GET user albums', () => {
            const userId = 1

            cy.api({
                method: 'GET',
                url: `${baseUrl}/users/${userId}/albums`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                response.body.forEach(album => {
                    expect(album.userId).to.eq(userId)
                })
            })
        })

        it('Should GET user todos', () => {
            const userId = 1

            cy.api({
                method: 'GET',
                url: `${baseUrl}/users/${userId}/todos`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                response.body.forEach(todo => {
                    expect(todo.userId).to.eq(userId)
                    expect(todo).to.have.property('completed')
                })
            })
        })

        it('Should GET album photos', () => {
            const albumId = 1

            cy.api({
                method: 'GET',
                url: `${baseUrl}/albums/${albumId}/photos`
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                response.body.forEach(photo => {
                    expect(photo.albumId).to.eq(albumId)
                    expect(photo).to.have.property('url')
                    expect(photo).to.have.property('thumbnailUrl')
                })
            })
        })
    })

    context('Error Handling Tests', () => {

        it('Should return 404 for non-existent post', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/999`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

        it('Should handle invalid post ID gracefully', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/invalid`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

})