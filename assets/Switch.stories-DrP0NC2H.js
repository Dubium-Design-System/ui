import{n as e}from"./chunk-BneVvdWh.js";import{n as t,t as n}from"./dist-B56oL4AG.js";var r,i,a,o,s,c,l,u,d,f,p,m,h;e((()=>{n(),{fn:r}=__STORYBOOK_MODULE_TEST__,i={title:`Components/Switch`,component:t,parameters:{layout:`centered`},tags:[`autodocs`],argTypes:{checked:{control:{type:`boolean`},description:`Текущее состояние переключателя (управляемый режим)`},defaultChecked:{control:{type:`boolean`},description:`Начальное состояние переключателя (неуправляемый режим)`},label:{control:{type:`text`},description:`Текст или React-элемент для отображения метки`},disabled:{control:{type:`boolean`},description:`Отключение переключателя`},labelPosition:{control:{type:`select`},options:[`left`,`right`],description:`Позиция метки относительно переключателя`},ariaLabel:{control:{type:`text`},description:`ARIA-метка для accessibility`},ariaDescription:{control:{type:`text`},description:`ARIA-описание для дополнительной accessibility информации`}},args:{onChange:r(),defaultChecked:!1,disabled:!1,labelPosition:`right`}},a={args:{label:`Switch label`,defaultChecked:!1}},o={args:{label:`Checked switch`,defaultChecked:!0}},s={args:{label:`Label on the left`,labelPosition:`left`,defaultChecked:!1}},c={args:{label:`Disabled switch`,disabled:!0,defaultChecked:!1}},l={args:{label:`Disabled checked switch`,disabled:!0,defaultChecked:!0}},u={args:{label:void 0,defaultChecked:!1}},d={args:{label:`Notifications`,ariaLabel:`Enable or disable notifications`,defaultChecked:!1}},f={args:{label:`Auto-save`,ariaDescription:`When enabled, your changes will be saved automatically`,defaultChecked:!1}},p={args:{label:`Controlled switch`,checked:!0},parameters:{docs:{description:{story:"В управляемом режиме состояние контролируется через `checked` проп. Используйте `onChange` для обновления состояния."}}}},m={args:{label:`Uncontrolled switch`,defaultChecked:!0},parameters:{docs:{description:{story:"В неуправляемом режиме переключатель управляет своим состоянием самостоятельно. Начальное состояние задается через `defaultChecked`."}}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Switch label",
    defaultChecked: false
  }
}`,...a.parameters?.docs?.source},description:{story:`Базовое состояние переключателя с меткой справа`,...a.parameters?.docs?.description}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Checked switch",
    defaultChecked: true
  }
}`,...o.parameters?.docs?.source},description:{story:`Переключатель во включенном состоянии`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Label on the left",
    labelPosition: "left",
    defaultChecked: false
  }
}`,...s.parameters?.docs?.source},description:{story:`Переключатель с меткой слева`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Disabled switch",
    disabled: true,
    defaultChecked: false
  }
}`,...c.parameters?.docs?.source},description:{story:`Отключенный переключатель`,...c.parameters?.docs?.description}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Disabled checked switch",
    disabled: true,
    defaultChecked: true
  }
}`,...l.parameters?.docs?.source},description:{story:`Отключенный переключатель во включенном состоянии`,...l.parameters?.docs?.description}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: undefined,
    defaultChecked: false
  }
}`,...u.parameters?.docs?.source},description:{story:`Переключатель без метки`,...u.parameters?.docs?.description}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Notifications",
    ariaLabel: "Enable or disable notifications",
    defaultChecked: false
  }
}`,...d.parameters?.docs?.source},description:{story:`Переключатель с ARIA-меткой для улучшенной доступности`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Auto-save",
    ariaDescription: "When enabled, your changes will be saved automatically",
    defaultChecked: false
  }
}`,...f.parameters?.docs?.source},description:{story:`Переключатель с ARIA-описанием`,...f.parameters?.docs?.description}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Controlled switch",
    checked: true
  },
  parameters: {
    docs: {
      description: {
        story: "В управляемом режиме состояние контролируется через \`checked\` проп. Используйте \`onChange\` для обновления состояния."
      }
    }
  }
}`,...p.parameters?.docs?.source},description:{story:`Управляемый режим (интерактивный пример)
@description Используйте Actions панель для отслеживания onChange событий`,...p.parameters?.docs?.description}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: "Uncontrolled switch",
    defaultChecked: true
  },
  parameters: {
    docs: {
      description: {
        story: "В неуправляемом режиме переключатель управляет своим состоянием самостоятельно. Начальное состояние задается через \`defaultChecked\`."
      }
    }
  }
}`,...m.parameters?.docs?.source},description:{story:`Неуправляемый режим с начальным состоянием`,...m.parameters?.docs?.description}}},h=[`Primary`,`Checked`,`LabelLeft`,`Disabled`,`DisabledChecked`,`WithoutLabel`,`WithAriaLabel`,`WithAriaDescription`,`Controlled`,`Uncontrolled`]}))();export{o as Checked,p as Controlled,c as Disabled,l as DisabledChecked,s as LabelLeft,a as Primary,m as Uncontrolled,f as WithAriaDescription,d as WithAriaLabel,u as WithoutLabel,h as __namedExportsOrder,i as default};