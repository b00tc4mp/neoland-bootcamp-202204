try {
    const logger = new Logger
    
    // logger.setLevel(Logger.INFO)
    // logger.setLevel(Logger.ERROR)
    // logger.setLevel(10)
    
    logger.debug('hola mundo')
    
    logger.info('Loading React...')
    
    logger.warn('no response from server')
    
    logger.error('server crashed')
    
    logger.fatal('server is burning!!!!')
} catch(error) {
    alert(error.message)
}

console.log('hola mundo')