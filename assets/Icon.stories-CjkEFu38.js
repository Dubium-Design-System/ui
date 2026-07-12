import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DvhXfW8u.js";import{n,o as r,s as i,t as a}from"./dist-CHhdTgpu.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{a(),o=t(),{fn:s}=__STORYBOOK_MODULE_TEST__,c=({color:e=`currentColor`})=>(0,o.jsx)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":`true`,children:(0,o.jsx)(`path`,{d:`M20 6L9 17L4 12`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`,strokeLinejoin:`round`})}),l=({color:e=`currentColor`})=>(0,o.jsx)(`svg`,{width:`100%`,height:`100%`,viewBox:`0 0 24 24`,fill:`none`,xmlns:`http://www.w3.org/2000/svg`,"aria-hidden":`true`,children:(0,o.jsx)(`path`,{d:`M12 5V19M5 12H19`,stroke:e,strokeWidth:`2`,strokeLinecap:`round`})}),u={Check:()=>Promise.resolve({default:c}),Plus:()=>Promise.resolve({default:l})},d=r(),f={title:`Components/Icon`,component:i,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{name:{control:{type:`select`},options:[`Close`],description:`Имя иконки из встроенного или кастомного реестра.`},size:{control:{type:`number`,min:8,max:96,step:1},description:`Приоритетный квадратный размер иконки.`},width:{control:{type:`number`,min:8,max:160,step:1},description:`Ширина иконки. Если не задана, используется size.`},height:{control:{type:`number`,min:8,max:160,step:1},description:`Высота иконки. Если не задана, используется size.`},color:{control:`color`,description:`Цвет иконки.`},deg:{control:{type:`number`,min:0,max:360,step:15},description:`Поворот иконки в градусах.`},ariaLabel:{control:`text`,description:`Доступное имя иконки.`},onClick:{action:`clicked`,description:`Обработчик клика.`}},args:{name:`Close`,size:24,color:`currentColor`,deg:0,ariaLabel:`Close`,onClick:s()}},p={args:{name:`Close`,size:32,color:`currentColor`,ariaLabel:`Close`}},m={render:e=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,o.jsx)(i,{...e,size:16}),(0,o.jsx)(i,{...e,size:24}),(0,o.jsx)(i,{...e,size:32}),(0,o.jsx)(i,{...e,size:48}),(0,o.jsx)(i,{...e,size:64})]}),args:{name:`Close`,color:`currentColor`,ariaLabel:`Close`}},h={render:e=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,o.jsx)(i,{...e,color:`currentColor`}),(0,o.jsx)(i,{...e,color:`#1d4ed8`}),(0,o.jsx)(i,{...e,color:`#15803d`}),(0,o.jsx)(i,{...e,color:`#b91c1c`}),(0,o.jsx)(i,{...e,color:`#9333ea`})]}),args:{name:`Close`,size:40,ariaLabel:`Close`}},g={render:e=>(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,o.jsx)(i,{...e,deg:0}),(0,o.jsx)(i,{...e,deg:45}),(0,o.jsx)(i,{...e,deg:90}),(0,o.jsx)(i,{...e,deg:180})]}),args:{name:`Close`,size:40,color:`currentColor`,ariaLabel:`Close`}},_={args:{name:`Close`,size:24,width:48,height:24,color:`currentColor`,ariaLabel:`Close`}},v={args:{name:`Close`,size:40,color:`currentColor`,ariaLabel:`Close`,onClick:s()}},y={parameters:{controls:{disable:!0}},render:()=>(0,o.jsx)(n,{icons:u,children:(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:16},children:[(0,o.jsx)(d,{name:`Check`,size:40,color:`#15803d`,ariaLabel:`Check`}),(0,o.jsx)(d,{name:`Plus`,size:40,color:`#1d4ed8`,ariaLabel:`Plus`}),(0,o.jsx)(d,{name:`Close`,size:40,color:`currentColor`,ariaLabel:`Close`})]})})},b={parameters:{controls:{disable:!0}},render:()=>(0,o.jsx)(n,{icons:u,children:(0,o.jsxs)(`div`,{style:{display:`grid`,gap:16,justifyItems:`center`},children:[(0,o.jsx)(d,{name:`Check`,size:64,color:`#15803d`,ariaLabel:`Check`}),(0,o.jsx)(`code`,{children:`const StoryIcon = createIcon<typeof storyIcons>();`})]})})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    name: "Close",
    size: 32,
    color: "currentColor",
    ariaLabel: "Close"
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
                <Icon {...args} size={16} />
                <Icon {...args} size={24} />
                <Icon {...args} size={32} />
                <Icon {...args} size={48} />
                <Icon {...args} size={64} />
            </div>;
  },
  args: {
    name: "Close",
    color: "currentColor",
    ariaLabel: "Close"
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
                <Icon {...args} color="currentColor" />
                <Icon {...args} color="#1d4ed8" />
                <Icon {...args} color="#15803d" />
                <Icon {...args} color="#b91c1c" />
                <Icon {...args} color="#9333ea" />
            </div>;
  },
  args: {
    name: "Close",
    size: 40,
    ariaLabel: "Close"
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16
    }}>
                <Icon {...args} deg={0} />
                <Icon {...args} deg={45} />
                <Icon {...args} deg={90} />
                <Icon {...args} deg={180} />
            </div>;
  },
  args: {
    name: "Close",
    size: 40,
    color: "currentColor",
    ariaLabel: "Close"
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    name: "Close",
    size: 24,
    width: 48,
    height: 24,
    color: "currentColor",
    ariaLabel: "Close"
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    name: "Close",
    size: 40,
    color: "currentColor",
    ariaLabel: "Close",
    onClick: fn()
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    return <DUIProvider icons={storyIcons}>
                <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16
      }}>
                    <StoryIcon name="Check" size={40} color="#15803d" ariaLabel="Check" />

                    <StoryIcon name="Plus" size={40} color="#1d4ed8" ariaLabel="Plus" />

                    <StoryIcon name="Close" size={40} color="currentColor" ariaLabel="Close" />
                </div>
            </DUIProvider>;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => {
    return <DUIProvider icons={storyIcons}>
                <div style={{
        display: "grid",
        gap: 16,
        justifyItems: "center"
      }}>
                    <StoryIcon name="Check" size={64} color="#15803d" ariaLabel="Check" />

                    <code>
                        {"const StoryIcon = createIcon<typeof storyIcons>();"}
                    </code>
                </div>
            </DUIProvider>;
  }
}`,...b.parameters?.docs?.source}}},x=[`Playground`,`Sizes`,`Colors`,`Rotation`,`RectangleSize`,`Clickable`,`CustomIcons`,`CustomIconPlayground`]}))();export{v as Clickable,h as Colors,b as CustomIconPlayground,y as CustomIcons,p as Playground,_ as RectangleSize,g as Rotation,m as Sizes,x as __namedExportsOrder,f as default};