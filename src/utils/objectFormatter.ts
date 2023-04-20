import { omitBy, isNil } from 'lodash'

const objectFormatter = <T>(object: T) => omitBy(object, isNil)

export { objectFormatter }
