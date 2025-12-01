// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import {
  Codepen,
  ColorSliders,
  ColorTitle,
  DijkstraVisualizer,
  Excalidraw,
  Flex,
  IsAuthenticated,
  IsNotAuthenticated,
  IsTeacher,
  Logo,
  ModCalc,
  MuxVideo,
  OfmCallout,
  RenderHtml,
  TeachingNotes,
  TurtleEditor,
  Youtube,
  YoutubeTimestamp,
  StickMe,
  SQLQuestion,
  Question,
  Option
} from 'shared/components'
import { IgStrong } from 'shared/server/components'
import type { OfmCalloutProps } from 'shared/components'
import FeatherIcon from 'feather-icons-react'
import { Tabs } from 'nextra/components'
import cn from 'clsx'
import { createElement } from 'react'

const {
  tr: Tr,
  th: Th,
  table: Table,
  img: Image,
  ...docsComponents
} = getDocsMDXComponents()

export const useMDXComponents: typeof getDocsMDXComponents = components => ({
  ...docsComponents,
  excalidraw: Excalidraw,
  muxvideo: MuxVideo,
  ModCalc,
  TurtleEditor,
  turtle: TurtleEditor,
  strong: IgStrong,
  codepen: Codepen,
  renderhtml: RenderHtml,
  Youtube,
  YT: YoutubeTimestamp,
  IsAuthenticated,
  IsTeacher,
  IsNotAuthenticated,
  TeachingNotes,
  FeatherIcon,
  ColorSliders,
  Tabs,
  Flex,
  h1: ColorTitle,
  StickMe,
  blockquote: (props: OfmCalloutProps) =>
    props.className?.includes('callout-foldable') ? (
      createElement(OfmCallout, props as OfmCalloutProps)
    ) : (
      <blockquote
        className={cn(
          '_mt-6 _border-gray-300 _italic _text-gray-700 dark:_border-gray-700 dark:_text-gray-400',
          'first:_mt-0 ltr:_border-l-2 ltr:_pl-6 rtl:_border-r-2 rtl:_pr-6'
        )}
        {...props}
      />
    ),
  Question,
  Option,
  SQLQuestion,
  DijkstraVisualizer,
  dijkstra: DijkstraVisualizer,
  tr: Tr,
  th: Th,
  thead({ children, ...props }) {
    return (
      <thead {...props}>
        {children.props.children[0].props.children ? (
          children
        ) : (
          <Tr>
            <Th align="left">Option</Th>
            <Th align="left">Type</Th>
            {children.props.children.length === 4 && (
              <Th align="left">Default Value</Th>
            )}
            <Th align="left">Description</Th>
          </Tr>
        )}
      </thead>
    )
  },
  tbody: props => (
    <tbody
      className="break-words first:[&_td]:font-semibold first:[&_td]:text-violet-600 first:[&_td]:dark:text-violet-500 [&_tr]:!bg-transparent"
      {...props}
    />
  ),
  table: props => <Table className="w-full text-sm" {...props} />,
  img: props => (
    <Image
      {...props}
      className="nextra-border rounded-xl border drop-shadow-sm"
    />
  ),
  figure: props => <figure className="mt-6" {...props} />,
  figcaption: props => (
    <figcaption className="mt-2 text-center text-sm" {...props} />
  ),
  ...components
})
