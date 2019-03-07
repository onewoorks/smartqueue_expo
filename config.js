var _Environments = {
    localhost: {
        BASE_URL: 'http://localhost/SmartQ/smartq',
        API_KEY: '',
        IMAGE_URL: 'http://localhost/SmartQ/smartq/images/'
    },
    onewoorks: {
        BASE_URL: 'https://onewoorks-solutions.com/smartq',
        API_KEY: '',
        IMAGE_URL: 'https://onewoorks-solutions.com/smartq/images/',
        ASSETS: 'https://onewoorks-solutions.com/smartq/assets/images/'
    }
}

function getEnvironment() {
    return _Environments.onewoorks
}

var Environment = getEnvironment()
module.exports = Environment