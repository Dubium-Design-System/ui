import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-DvhXfW8u.js";import{c as n,t as r}from"./dist-CHhdTgpu.js";var i,a,o,s,c,l,u,d,f,p;e((()=>{r(),i=t(),{fn:a}=__STORYBOOK_MODULE_TEST__,o={title:`Components/Button`,component:n,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{children:{control:`text`,description:`Содержимое кнопки.`},type:{control:{type:`select`},options:[`button`,`submit`,`reset`],description:`Нативный HTML type для button.`},disabled:{control:`boolean`,description:`Отключает кнопку.`},fluid:{control:`boolean`,description:`Растягивает кнопку на всю доступную ширину контейнера.`},stopPropagation:{control:`boolean`,description:`Останавливает всплытие события click.`},preventDefault:{control:`boolean`,description:`Предотвращает действие по умолчанию для click.`},onClick:{action:`clicked`,description:`Обработчик клика.`}},args:{children:`Button`,type:`button`,disabled:!1,fluid:!1,stopPropagation:!1,preventDefault:!1,onClick:a()}},s={args:{children:`Button`}},c={args:{children:`Disabled button`,disabled:!0}},l={render:e=>(0,i.jsx)(`div`,{style:{width:320},children:(0,i.jsx)(n,{...e})}),args:{children:`Fluid button`,fluid:!0}},u={args:{children:`Submit`,type:`submit`}},d={render:e=>(0,i.jsx)(`div`,{role:`presentation`,style:{padding:24,border:`1px dashed currentColor`},onClick:a(),children:(0,i.jsx)(n,{...e})}),args:{children:`Stop propagation`,stopPropagation:!0}},f={args:{children:`Prevent default`,preventDefault:!0}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Button"
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Disabled button",
    disabled: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    width: 320
  }}>
            <Button {...args} />
        </div>,
  args: {
    children: "Fluid button",
    fluid: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Submit",
    type: "submit"
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <div role="presentation" style={{
    padding: 24,
    border: "1px dashed currentColor"
  }} onClick={fn()}>
            <Button {...args} />
        </div>,
  args: {
    children: "Stop propagation",
    stopPropagation: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Prevent default",
    preventDefault: true
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Disabled`,`Fluid`,`Submit`,`WithStopPropagation`,`WithPreventDefault`]}))();export{s as Default,c as Disabled,l as Fluid,u as Submit,f as WithPreventDefault,d as WithStopPropagation,p as __namedExportsOrder,o as default};