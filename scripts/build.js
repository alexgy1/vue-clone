const fs = require('fs')
const path = require('path')
const rollup = require('rollup')

let builds = require('./config').getAllBuilds()

console.log(builds)
build(builds)

function build (builds) {
    let built = 0
    const total = builds.length
    const next = ()=>{
        //promise
      buildEntry(builds[built]).then(()=>{
          built++
          if(built < total){
              next()
          }
      }).catch( logError)
    }

    next()
}


function buildEntry (config) {
    const output = config.output
    const { file, banner } = output
    console.log('file is', file)
    return rollup.rollup(config)
        .then(bundle => bundle.generate(output))
        .then( ({output : [{code}]}) =>{
            // console.log(code)
            return write(file, code)
        })
}


function write (dest, code, zip) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}

function logError (e) {
    console.log(e)
}

