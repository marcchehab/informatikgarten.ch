"use client"

import { TurtleEditor } from 'shared/components'
import Providers from 'shared/lib/Providers'
import 'shared/components/TurtleEditor/style/turtle.global.css'

const defaultCode = `import turtle

t = turtle.Turtle()

for i in range(4):
    t.forward(100)
    t.left(90)
`

export default function TurtleEditorPage() {
    return (
        <Providers>
            <TurtleEditor id="standalone-turtle-editor" height="100vh" theme="dark">
                {defaultCode}
            </TurtleEditor>
        </Providers>
    )
}
