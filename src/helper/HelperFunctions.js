//UUID
export const getUUID = () => {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0
            dt = Math.floor(dt / 16)
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
    )
    return uuid
}

//VALIDATION
let errorMsg = ''

export const validateProfile = (file) => {
    errorMsg = file && file.type.includes('image') ? '' : 'Not an image'
    return errorMsg
}

export const validateEmail = (email) => {
    if (!email) errorMsg = '*Required'
    else
        errorMsg = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
            ? ''
            : '*Invalid Email'
    return errorMsg
}

export const validatePhone = (phone) => {
    errorMsg = phone.match(/^\d{10}$/) ? '' : '*Invalid phone'
    return errorMsg
}

export const validateName = (name) => {
    if (!name || name === '') errorMsg = '*Required'
    else if (name.length < 4) errorMsg = '*Name too short'
    else if (name.length > 20) errorMsg = '*Name too long'
    else errorMsg = ''

    return errorMsg
}

export const validatePassword = (password1, password2 = true) => {
    let err1, err2

    if (!password1 && !password2) {
        err1 = '*Required'
        err2 = '*Required'
    } else if (!password1) {
        err1 = '*Required'
    } else if (!password2) {
        err2 = '*Required'
    } else if (password1 !== password2) {
        err2 = '*Enter same password'
    } else {
        err1 = ''
        err2 = ''
    }

    return [err1, err2]
}
