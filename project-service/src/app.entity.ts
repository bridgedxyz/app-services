import * as dynamoose from "dynamoose";

export interface ProjectRecord {
    /**
     * the db recird id of this project
     */
    id: string

    /**
     * the name of this project set by editor
     */
    projectName: string

    /**
     * the preview (cover) image set by eidtor, if non set, showing the default screen's perview, or bridged's default asset
     */
    previewImage: string

    /**
     * last update of this project's asset / scene
     */
    updatedAt: Date

    /**
     * the registration date of this project
     */
    createdAt: Date

    /**
     * the default locale of this project, set as en_US by default
     */
    defaultLocale: string

    /**
     * the available, supported locales of this project's assets.
     */
    locales: string[]

    /**
     * accessor name
     * name used for accessing configuration of this project by template syntax.
     * e.g. - BRIDGED -> so it can be reference on other projects like so,
     * "Hello ! {BRIDGED.SOME_SHARED_KEY}, great to use shared variables.")
     */
    accessorName: string

}


const TABLE = process.env.DYNAMODB_TABLE


export const ProjectSchema = new dynamoose.Schema({
    id: String,
    scenes: {
        type: Set,
        schema: [String]
    },
    description: String,
    alias: String,
}, {
    // https://github.com/dynamoose/dynamoose/pull/1050
    saveUnknown: true
})

export const Project = dynamoose.model(TABLE, ProjectSchema, {
    create: false
});
