function Container(width , height, depth) {
    // TODO
    
    this.width = width
    this.height = height
    this.depth = depth
    this.status = '🔒'
}



Container.prototype.open = function () {
    this.status = '🔓'
    
}

Container.prototype.close = function () {
    this.status = '🔒'
}