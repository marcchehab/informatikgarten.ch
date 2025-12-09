"use client"

import { TurtleEditor } from 'shared/components'
import Providers from 'shared/lib/Providers'
import 'shared/components/TurtleEditor/style/turtle.global.css'
import s from './turtleeditor.module.css'

const defaultCode = `import turtle

eva = turtle.Turtle()

for i in range(4):
    eva.forward(100)
    eva.left(90)
`

export default function TurtleEditorPage() {
    return (
        <Providers>
            <TurtleEditor id="standalone-turtle-editor" className={s.fullHeight} theme="dark" hideCanvasButtons hideEditorId>
                {defaultCode}
            </TurtleEditor>
        </Providers>
    )
}
