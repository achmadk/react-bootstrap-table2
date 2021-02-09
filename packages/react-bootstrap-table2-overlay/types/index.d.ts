import { ReactElement } from 'react'
import { LoadingOverLayProps } from 'react-loading-overlay-ts'

declare function overlayFactory(options?: LoadingOverLayProps): (loading: boolean) => ReactElement<LoadingOverLayProps>
export default overlayFactory