console.log('%cApium v1.2', 'font-size: 36px; background: linear-gradient(to right, #30CFD0 0%, #330867 100%); color: white;')

/**
 * API "Universal Messenger" (APIum)
 *
 * Processes HTTP requests/responses (http client)
 */
class Apium {
    /**
     * Constructs an instance of Apium
     * 
     * @param {string} baseUrl The base url to connect to
     */
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    /**
     * Performs an HTTP call to a server
     * 
     * @param {string} method The HTTP method (GET, POST, PATCH, PUT, DELETE, ...)
     * @param {string} urlOrPath The address of the server to connect to
     * @param {Object} options The required HTTP headers or body for the specific call
     *  
     * Example:
     * 
     * {
     *       headers: {
     *           Authorization: ...,
     *           'Content-Type': ...
     *       },
     *       body: ...
     *   }
     * 
     */
    call(method, urlOrPath, options) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest

            xhr.addEventListener('load', event => {
                const { status, responseText: payload } = event.target

                resolve({ status, payload })
            })

            xhr.addEventListener('error', () => {
                reject(new Error('API call fail'))
            })

            const url = urlOrPath.toLowerCase().startsWith('http://') || urlOrPath.toLowerCase().startsWith('https://') ? urlOrPath : `${this.baseUrl}/${urlOrPath}`

            xhr.open(method, url)

            if (options) {
                const { headers, body } = options

                if (headers)
                    for (const key in headers)
                        xhr.setRequestHeader(key, headers[key])

                xhr.send(body)
            } else xhr.send()
        })
    }

    get(urlOrPath, options) {
        return this.call('GET', urlOrPath, options)
    }

    post(urlOrPath, options) {
        return this.call('POST', urlOrPath, options)
    }

    patch(urlOrPath, options) {
        return this.call('PATCH', urlOrPath, options)
    }

    put(urlOrPath, options) {
        return this.call('PUT', urlOrPath, options)
    }

    delete(urlOrPath, options) {
        return this.call('DELETE', urlOrPath, options)
    }

    options(urlOrPath, options) {
        return this.call('OPTIONS', urlOrPath, options)
    }
}

export default Apium