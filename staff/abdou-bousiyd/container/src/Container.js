function Container(width, height, depth) {
    this.status = '🔒'
    this.width = width
    this.height = height
    this.depth = depth

}

Container.prototype.open =  function() {
    this.status = '🔓'
}

Container.prototype.close =  function() {
    this.status = '🔒'
}