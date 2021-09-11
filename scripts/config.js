const path = require('path')
const version = process.env.VERSION || require('../package.json').version

const banner =
    '/*!\n' +
    ` * Vue.js v${version}\n` +
    ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
    ' * Released under the MIT License.\n' +
    ' */'

const aliases = require('./alias1')
const resolve = p => {
    const base = p.split('/')[0]
    if (aliases[base]) {
        return path.resolve(aliases[base], p.slice(base.length + 1))
    } else {
        return path.resolve(__dirname, '../', p)
    }
}


const builds = {
    // runtime-only build (Browser)
    'web-runtime-dev': {
        entry: resolve('web/entry-runtime.js'),
        dest: resolve('dist/vue.runtime.js'),
        format: 'umd',
        banner
    },
    // Runtime+compiler development build (Browser)
    'web-full-dev': {
        entry: resolve('web/entry-runtime-with-compiler.js'),
        dest: resolve('dist/vue.js'),
        format: 'umd',
        banner
    },
}

function genConfig (name) {
    const opts = builds[name]
    const config = {
        input: opts.entry,
        output: {
            file: opts.dest,
            format: opts.format,
            banner: opts.banner,
            name: opts.moduleName || 'Vue'
        },
        onwarn: (msg, warn) => {
            if (!/Circular/.test(msg)) {
                warn(msg)
            }
        }
    }

    return config
}

exports.getAllBuilds = () => Object.keys(builds).map(genConfig)