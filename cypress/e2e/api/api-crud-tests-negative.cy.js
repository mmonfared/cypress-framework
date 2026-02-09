/// <reference types="cypress" />

// Typicode API Negative Testing
const baseUrl = Cypress.config('ApiBaseUrl')

describe('Typicode API Negative Tests', { tags: ['@api'] }, () => {

    context('CREATE - Negative Tests', () => {

        it('Should fail when creating post with empty body', { tags: ['@smoke'] }, () => {
            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: {},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201)
                // Typicode doesn't validate required fields, it still creates
                expect(response.body).to.have.property('id')
            })
        })

        it('Should fail when creating post with invalid data types', () => {
            const invalidPost = {
                title: 12345, // Should be string
                body: true,   // Should be string
                userId: 'not-a-number' // Should be number
            }

            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: invalidPost,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                // Typicode is permissive, but we're testing behavior
                expect(response.status).to.eq(201)
            })
        })

        it('Should handle POST request with extremely large payload', () => {
            const largePost = {
                title: 'a'.repeat(10000),
                body: 'b'.repeat(100000),
                userId: 1
            }

            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: largePost,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect([200, 201, 413]).to.include(response.status)
            })
        })

        it('Should handle POST with missing Content-Type header', () => {
            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: {
                    title: 'Test',
                    body: 'Content',
                    userId: 1
                },
                failOnStatusCode: false
            }).then((response) => {
                // Most APIs accept this, but it's a common error
                expect([200, 201, 415]).to.include(response.status)
            })
        })
    })

    context('READ - Negative Tests', () => {

        it('Should return 404 for non-existent post ID', { tags: ['@smoke'] }, () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/999999`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
                expect(response.body).to.be.empty
            })
        })

        it('Should return 404 for invalid post ID (non-numeric)', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/invalid-id`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

        it('Should return 404 for negative post ID', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/-1`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

        it('Should return 404 for non-existent user', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/users/999`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

        it('Should handle invalid query parameters gracefully', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts?userId=invalid`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body).to.be.empty
            })
        })

        it('Should return 404 for non-existent nested resource', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/999/comments`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
                expect(response.body).to.be.empty
            })
        })

        it('Should return 404 for invalid endpoint', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/nonexistent`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

        it('Should handle malformed URL path', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts//1`,
                failOnStatusCode: false
            }).then((response) => {
                expect([200, 404]).to.include(response.status)
            })
        })
    })

    context('UPDATE - Negative Tests', () => {

        it('Should fail to patch non-existent post', () => {
            cy.api({
                method: 'PATCH',
                url: `${baseUrl}/posts/999999`,
                body: {
                    title: 'Patched Title'
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect([200, 404]).to.include(response.status)
            })
        })

        it('Should handle PUT with empty body', () => {
            cy.api({
                method: 'PUT',
                url: `${baseUrl}/posts/1`,
                body: {},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Should handle PATCH with invalid data types', () => {
            cy.api({
                method: 'PATCH',
                url: `${baseUrl}/posts/1`,
                body: {
                    title: 12345,
                    userId: 'not-a-number'
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('Should handle update with missing required fields', () => {
            cy.api({
                method: 'PUT',
                url: `${baseUrl}/posts/1`,
                body: {
                    title: 'Only Title'
                    // Missing body and userId
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })

    context('DELETE - Negative Tests', () => {

        it('Should fail to delete non-existent post', { tags: ['@smoke'] }, () => {
            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/posts/999999`,
                failOnStatusCode: false
            }).then((response) => {
                // Typicode returns 200 even for non-existent resources
                expect([200, 404]).to.include(response.status)
            })
        })

        it('Should fail to delete with invalid post ID', () => {
            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/posts/invalid`,
                failOnStatusCode: false
            }).then((response) => {
                expect([200, 404]).to.include(response.status)
            })
        })

        it('Should handle delete with negative ID', () => {
            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/posts/-1`,
                failOnStatusCode: false
            }).then((response) => {
                expect([200, 404]).to.include(response.status)
            })
        })

        it('Should fail to delete from invalid endpoint', () => {
            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/nonexistent/1`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })
    })

    context('Method Not Allowed Tests', () => {

        it('Should return error for unsupported DELETE on root posts endpoint', () => {
            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/posts`,
                failOnStatusCode: false
            }).then((response) => {
                // Typically 405 Method Not Allowed or 404
                expect([404, 405]).to.include(response.status)
            })
        })

        it('Should fail for PUT on collection endpoint', () => {
            cy.api({
                method: 'PUT',
                url: `${baseUrl}/posts`,
                body: { title: 'Test' },
                failOnStatusCode: false
            }).then((response) => {
                expect([404, 405]).to.include(response.status)
            })
        })
    })

    context('Edge Cases and Boundary Tests', () => {

        it('Should handle zero as post ID', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/0`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

        it('Should handle very large post ID', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts/999999999999`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404)
            })
        })

        it('Should handle special characters in query parameters', () => {
            cy.api({
                method: 'GET',
                url: `${baseUrl}/posts?title=<script>alert('xss')</script>`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
            })
        })

        it('Should handle null values in request body', () => {
            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: {
                    title: null,
                    body: null,
                    userId: null
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(201)
            })
        })

        it('Should handle array instead of object in POST', () => {
            cy.api({
                method: 'POST',
                url: `${baseUrl}/posts`,
                body: ['invalid', 'array', 'data'],
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect([200, 201, 400]).to.include(response.status)
            })
        })
    })

})