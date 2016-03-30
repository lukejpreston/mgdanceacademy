function ye_dom() {
    'use strict'

    function isObject(obj) {
        var arrayConstructor = [].constructor
        var objectConstructor = {}.constructor
        return obj !== undefined && obj !== null && obj.constructor && (obj.constructor === arrayConstructor || obj.constructor === objectConstructor)
    }

    function isArray(obj) {
        var arrayConstructor = [].constructor
        return obj !== undefined && obj !== null && obj.constructor && obj.constructor === arrayConstructor
    }

    function removeClass(element, className) {
        className = className || ''

        function remove(className) {
            var classNameToReplace = className
            if (~element.className.indexOf(' ' + className)) classNameToReplace = ' ' + classNameToReplace
            element.className = element.className.replace(classNameToReplace, '')
        }
        if (!isArray(className)) className = [].concat(className)
        className.forEach(remove)
        return element
    }

    function addClass(element, className) {
        className = className || ''

        function add(className) {
            removeClass(element, className)
            element.className = element.className + ' ' + className
        }

        if (!isArray(className)) className = [].concat(className)
        className.forEach(add)
        return element
    }

    function changeClass(element, oldClass, newClass) {
        removeClass(element, oldClass)
        addClass(element, newClass)
        return element
    }

    function hasClass(element, className) {
        return element.className.indexOf(className) !== -1
    }

    function setAttribute(element, name, value) {
        var attribute = value
        if (isObject(value)) attribute = JSON.stringify(value)
        element.setAttribute(name, attribute)
        element[name] = value
        return element
    }

    function appendChild(element, children) {
        children = children || []
        if (!isArray(children)) children = [].concat(children)
        children.forEach(function(child) {
            element.appendChild(child)
        })
        return element
    }

    function removeChild(element, children) {
        children = children || []
        if (!isArray(children)) children = [].concat(children)
        children.forEach(function(child) {
            if (typeof child === 'number') element.removeChild(element.children[child])
            else element.removeChild(child)
        })
        return element
    }

    function stylise(element, styles) {
        if (typeof styles === 'string')
            element.style = styles
        else {
            styles = styles || {}
            element.style = Object.keys(styles).map(function(key) {
                return key.replace(/_/g, '-') + ': ' + styles[key] + ';'
            }).join(' ')
        }
        return element
    }

    function extendElement(element) {
        element.addClass = function(className) {
            return addClass(element, className)
        }

        element.removeClass = function(className) {
            return removeClass(element, className)
        }

        element.changeClass = function(oldClass, newClass) {
            return changeClass(element, oldClass, newClass)
        }

        element.hasClass = function(className) {
            return hasClass(element, className)
        }

        element.set = function(name, value) {
            return setAttribute(element, name, value)
        }

        element.add = function(children) {
            return appendChild(element, children)
        }

        element.rm = function(children) {
            return removeChild(element, children)
        }

        element.stylise = function(styles) {
            return stylise(element, styles)
        }

        return element
    }

    function createElement(name, options) {
        options = options || {}
        var element = document.createElement(name)

        element = extendElement(element)

        element.addClass(options.className)
        element.add(options.children)
        element.stylise(options.style)
        if (options.hasOwnProperty('parent')) appendChild(options.parent, element)

        Object.keys(options)
            .filter(function(key) {
                return key !== 'className' && key !== 'parent' && key !== 'children' && key !== 'style'
            })
            .forEach(function(key) {
                if (element[key] !== undefined) element[key] = options[key]
                else element.set(key, options[key])
            })

        return element
    }

    function query() {
        var args = arguments
        var selector = Object.keys(arguments).map(function(index) {
            return args[index]
        }).join('')
        return extendElement(document.querySelector(selector))
    }

    function queryAll() {
        var args = arguments
        var selector = Object.keys(arguments).map(function(index) {
            return args[index]
        }).join('')
        var elements = document.querySelectorAll(selector)
        return Object.keys(elements).map(function(key) {
            var element = elements[key]
            return extendElement(element)
        })
    }

    var dom = {
        removeClass: removeClass,
        addClass: addClass,
        changeClass: changeClass,
        hasClass: hasClass,
        createElement: createElement,
        query: query,
        queryAll: queryAll,
        appendChild: appendChild,
        removeChild: removeChild,
        setAttribute: setAttribute,
        stylise: stylise,
        tag: {
            'a': function(options) {
                return createElement('a', options)
            },
            'abbr': function(options) {
                return createElement('abbr', options)
            },
            'acronym': function(options) {
                return createElement('acronym', options)
            },
            'address': function(options) {
                return createElement('address', options)
            },
            'applet': function(options) {
                return createElement('applet', options)
            },
            'area': function(options) {
                return createElement('area', options)
            },
            'article': function(options) {
                return createElement('article', options)
            },
            'aside': function(options) {
                return createElement('aside', options)
            },
            'audio': function(options) {
                return createElement('audio', options)
            },
            'b': function(options) {
                return createElement('b', options)
            },
            'base': function(options) {
                return createElement('base', options)
            },
            'basefont': function(options) {
                return createElement('basefont', options)
            },
            'bdi': function(options) {
                return createElement('bdi', options)
            },
            'bdo': function(options) {
                return createElement('bdo', options)
            },
            'big': function(options) {
                return createElement('big', options)
            },
            'blockquote': function(options) {
                return createElement('blockquote', options)
            },
            'br': function(options) {
                return createElement('br', options)
            },
            'button': function(options) {
                return createElement('button', options)
            },
            'canvas': function(options) {
                return createElement('canvas', options)
            },
            'caption': function(options) {
                return createElement('caption', options)
            },
            'center': function(options) {
                return createElement('center', options)
            },
            'cite': function(options) {
                return createElement('cite', options)
            },
            'code': function(options) {
                return createElement('code', options)
            },
            'col': function(options) {
                return createElement('col', options)
            },
            'colgroup': function(options) {
                return createElement('colgroup', options)
            },
            'datalist': function(options) {
                return createElement('datalist', options)
            },
            'dd': function(options) {
                return createElement('dd', options)
            },
            'del': function(options) {
                return createElement('del', options)
            },
            'details': function(options) {
                return createElement('details', options)
            },
            'dfn': function(options) {
                return createElement('dfn', options)
            },
            'dialog': function(options) {
                return createElement('dialog', options)
            },
            'dir': function(options) {
                return createElement('dir', options)
            },
            'div': function(options) {
                return createElement('div', options)
            },
            'dl': function(options) {
                return createElement('dl', options)
            },
            'dt': function(options) {
                return createElement('dt', options)
            },
            'em': function(options) {
                return createElement('em', options)
            },
            'embed': function(options) {
                return createElement('embed', options)
            },
            'fieldset': function(options) {
                return createElement('fieldset', options)
            },
            'figcaption': function(options) {
                return createElement('figcaption', options)
            },
            'figure': function(options) {
                return createElement('figure', options)
            },
            'font': function(options) {
                return createElement('font', options)
            },
            'footer': function(options) {
                return createElement('footer', options)
            },
            'form': function(options) {
                return createElement('form', options)
            },
            'frame': function(options) {
                return createElement('frame', options)
            },
            'frameset': function(options) {
                return createElement('frameset', options)
            },
            'h1': function(options) {
                return createElement('h1', options)
            },
            'h2': function(options) {
                return createElement('h2', options)
            },
            'h3': function(options) {
                return createElement('h3', options)
            },
            'h4': function(options) {
                return createElement('h4', options)
            },
            'h5': function(options) {
                return createElement('h5', options)
            },
            'h6': function(options) {
                return createElement('h6', options)
            },
            'head': function(options) {
                return createElement('head', options)
            },
            'header': function(options) {
                return createElement('header', options)
            },
            'hr': function(options) {
                return createElement('hr', options)
            },
            'html': function(options) {
                return createElement('html', options)
            },
            'i': function(options) {
                return createElement('i', options)
            },
            'iframe': function(options) {
                return createElement('iframe', options)
            },
            'img': function(options) {
                return createElement('img', options)
            },
            'input': function(options) {
                return createElement('input', options)
            },
            'ins': function(options) {
                return createElement('ins', options)
            },
            'kbd': function(options) {
                return createElement('kbd', options)
            },
            'keygen': function(options) {
                return createElement('keygen', options)
            },
            'label': function(options) {
                return createElement('label', options)
            },
            'legend': function(options) {
                return createElement('legend', options)
            },
            'li': function(options) {
                return createElement('li', options)
            },
            'link': function(options) {
                return createElement('link', options)
            },
            'main': function(options) {
                return createElement('main', options)
            },
            'map': function(options) {
                return createElement('map', options)
            },
            'mark': function(options) {
                return createElement('mark', options)
            },
            'menu': function(options) {
                return createElement('menu', options)
            },
            'menuitem': function(options) {
                return createElement('menuitem', options)
            },
            'meta': function(options) {
                return createElement('meta', options)
            },
            'meter': function(options) {
                return createElement('meter', options)
            },
            'nav': function(options) {
                return createElement('nav', options)
            },
            'noframes': function(options) {
                return createElement('noframes', options)
            },
            'noscript': function(options) {
                return createElement('noscript', options)
            },
            'object': function(options) {
                return createElement('object', options)
            },
            'ol': function(options) {
                return createElement('ol', options)
            },
            'optgroup': function(options) {
                return createElement('optgroup', options)
            },
            'option': function(options) {
                return createElement('option', options)
            },
            'output': function(options) {
                return createElement('output', options)
            },
            'p': function(options) {
                return createElement('p', options)
            },
            'param': function(options) {
                return createElement('param', options)
            },
            'pre': function(options) {
                return createElement('pre', options)
            },
            'progress': function(options) {
                return createElement('progress', options)
            },
            'q': function(options) {
                return createElement('q', options)
            },
            'rp': function(options) {
                return createElement('rp', options)
            },
            'rt': function(options) {
                return createElement('rt', options)
            },
            'ruby': function(options) {
                return createElement('ruby', options)
            },
            's': function(options) {
                return createElement('s', options)
            },
            'samp': function(options) {
                return createElement('samp', options)
            },
            'script': function(options) {
                return createElement('script', options)
            },
            'section': function(options) {
                return createElement('section', options)
            },
            'select': function(options) {
                return createElement('select', options)
            },
            'small': function(options) {
                return createElement('small', options)
            },
            'source': function(options) {
                return createElement('source', options)
            },
            'span': function(options) {
                return createElement('span', options)
            },
            'strike': function(options) {
                return createElement('strike', options)
            },
            'strong': function(options) {
                return createElement('strong', options)
            },
            'sub': function(options) {
                return createElement('sub', options)
            },
            'summary': function(options) {
                return createElement('summary', options)
            },
            'sup': function(options) {
                return createElement('sup', options)
            },
            'table': function(options) {
                return createElement('table', options)
            },
            'tbody': function(options) {
                return createElement('tbody', options)
            },
            'td': function(options) {
                return createElement('td', options)
            },
            'textarea': function(options) {
                return createElement('textarea', options)
            },
            'tfoot': function(options) {
                return createElement('tfoot', options)
            },
            'th': function(options) {
                return createElement('th', options)
            },
            'thead': function(options) {
                return createElement('thead', options)
            },
            'time': function(options) {
                return createElement('time', options)
            },
            'title': function(options) {
                return createElement('title', options)
            },
            'tr': function(options) {
                return createElement('tr', options)
            },
            'track': function(options) {
                return createElement('track', options)
            },
            'tt': function(options) {
                return createElement('tt', options)
            },
            'u': function(options) {
                return createElement('u', options)
            },
            'ul': function(options) {
                return createElement('ul', options)
            },
            'var': function(options) {
                return createElement('var', options)
            },
            'video': function(options) {
                return createElement('video', options)
            },
            'wbr': function(options) {
                return createElement('wbr', options)
            }
        }
    }


    dom.body = document.body

    return dom
}

window.dom = ye_dom()
