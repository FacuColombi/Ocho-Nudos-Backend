export default function response(message, code, error = false, data = null){
        return JSON.stringify({
        message: message,
        data: data,
        code: code,
        error: error
    });
}