export default function response(message, error = false, data = null){
        return {
        message: message,
        data: data,
        error: error
    }
}