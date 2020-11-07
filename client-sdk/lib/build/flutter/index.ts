import { compileComplete } from "dart-services"
import { makeShortUrl } from "../../url"
import { upload } from "../../hosting"

export async function buildAndHostSimpleApp(props: {
    dart: string,
    id: string
}): Promise<string> {
    // compile dart source to js
    const compiled = await compileComplete(props.dart)

    // host js file
    const hosted = await upload({
        file: compiled.result,
        name: props.id
    })

    // make short url for hosted js file
    const short = await makeShortUrl({
        url: hosted.url
    })

    // return the short url
    return short.url;
}