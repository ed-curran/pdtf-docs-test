import { API } from '@stoplight/elements';
import {TryIt, TryItWithRequestSamples} from '@stoplight/elements-core';
import '@stoplight/elements/styles.min.css';
import {JsonSchemaViewer} from '@stoplight/json-schema-viewer'
import Prism from 'prismjs'

export function PdtfApi({ layout = 'sidebar', currentVersion = 'v1' }) {

   return  (
        <API
            apiDescriptionUrl="/pdtf-api-1.2.0.yaml" //this works because this file is is in our public dir. importing directly is awkward cus this component runs client side only
            apiDescriptionDocument={''}
        />
    );
}

export function PdtfTryIt({ layout = 'sidebar', currentVersion = 'v1' }) {

    return  (
       <TryIt embeddedInMd={true} httpOperation={{
           method: "GET",
          servers: ["https://todos.stoplight.io"],
          path: "/todos",
          responses: [{}]
       }}/>
    );
}

export function PdtfJsonSchemaViewer(props: any) {
  globalThis.Prism = Prism
  return (
    <JsonSchemaViewer {...props}
    />
  )
}

// export default function Home() {
//     const router = useHistory();
//     const size = useBreakpoint();
//
//     const location = router.location;
//
//     const url = new URL(
//         `https://docs.dyte.io${location.pathname}${location.search}`
//     );
//
//     const currentVersion = url.searchParams.get('v') || 'v2';
//
//     return (
//         <Layout
//             title="API Reference"
//             description="Dyte REST API Reference"
//             noFooter
//             wrapperClassName="api-reference"
//         >
//             <Head>
//                 {/* Load styles for Stoplight Elements */}
//                 <link rel="preload" href="/assets/css/elements.min.css" as="style" />
//                 <link rel="stylesheet" href="/assets/css/elements.min.css" />
//             </Head>
//
//             <div className="flex flex-col items-center justify-center gap-4 border-b py-12 text-sm lg:hidden">
//                 <Monitor className="h-12 w-12" />
//                 This page is best viewed in a desktop browser.
//             </div>
//
//             <div className="header">
//                 <h1 className="mb-0 flex items-center gap-2 text-sm font-semibold lg:text-lg">
//                     <APIIcon className="hidden h-8 lg:block" />
//                     REST API
//                 </h1>
//                 <div className="aside">
//                     {currentVersion === 'v2' && (
//                         <Link
//                             href="/release-notes/rest-api"
//                             className="no-underline-links text-xs"
//                         >
//                             Release Notes
//                         </Link>
//                     )}
//                     {size === 'lg' && <RunInPostmanButton />}
//                     <SectionsMenu
//                         defaultValue={currentVersion}
//                         values={[
//                             { name: 'v1', docId: 'v1' },
//                             { name: 'v2', docId: 'v2' },
//                         ]}
//                         onValueChange={(version) => {
//                             router.push(`/api/?v=${version}`);
//                         }}
//                         className="compact"
//                     />
//                 </div>
//             </div>
//             <APIElement
//                 layout={size === 'sm' ? 'stacked' : 'sidebar'}
//                 currentVersion={currentVersion}
//             />
//         </Layout>
//     );
// }