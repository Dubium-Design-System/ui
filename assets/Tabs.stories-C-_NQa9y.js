import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{a as n}from"./iframe-Bq4T5koC.js";import{t as r}from"./jsx-runtime-DvhXfW8u.js";import{r as i,t as a}from"./dist-CHhdTgpu.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b;t((()=>{o=e(n(),1),a(),s=r(),{fn:c}=__STORYBOOK_MODULE_TEST__,l=[{key:`overview`,label:`Обзор`},{key:`details`,label:`Детали`},{key:`settings`,label:`Настройки`}],u=[{key:1,label:`Шаг 1`},{key:2,label:`Шаг 2`},{key:3,label:`Шаг 3`}],d=[{key:`all`,label:`Все`},{key:`active`,label:`Активные`},{key:`drafts`,label:`Черновики`},{key:`archived`,label:`Архив`},{key:`deleted`,label:`Удалённые`}],f=(e,t)=>e.find(e=>e.key===t)?.label??String(t),p={title:`Components/Tabs`,component:i,parameters:{layout:`centered`,docs:{description:{component:"`Tabs` отображает список вкладок и управляется извне через `isActive` и `onChange`. Компонент не хранит активную вкладку внутри себя."}}},tags:[`autodocs`],argTypes:{tabs:{control:`object`,description:`Массив вкладок.`},isActive:{control:{type:`select`},options:[`overview`,`details`,`settings`],description:`Ключ активной вкладки.`},onChange:{action:`changed`,description:`Callback, вызываемый при выборе вкладки.`}},args:{tabs:l,isActive:`overview`,onChange:c()}},m=({tabs:e,isActive:t,onChange:n})=>{let[r,a]=(0,o.useState)(t);return(0,s.jsxs)(`div`,{style:{display:`grid`,gap:16,minWidth:360},children:[(0,s.jsx)(i,{tabs:e,isActive:r,onChange:(0,o.useCallback)(e=>{a(e.key),n(e)},[n])}),(0,s.jsxs)(`div`,{style:{padding:16,border:`1px solid #e5e5e5`,borderRadius:8,background:`#fff`},children:[`Активная вкладка:`,` `,(0,s.jsx)(`strong`,{children:f(e,r)})]})]})},h={parameters:{docs:{description:{story:`Базовый управляемый пример. Активная вкладка хранится во внешнем состоянии.`}}},render:e=>(0,s.jsx)(m,{...e})},g={parameters:{docs:{description:{story:`Пример с отображением разного контента в зависимости от активной вкладки.`}}},render:e=>{let[t,n]=(0,o.useState)(e.isActive);return(0,s.jsxs)(`div`,{style:{display:`grid`,gap:16,width:480},children:[(0,s.jsx)(i,{tabs:e.tabs,isActive:t,onChange:t=>{n(t.key),e.onChange(t)}}),(0,s.jsxs)(`div`,{style:{padding:20,border:`1px solid #e5e5e5`,borderRadius:12,background:`#fff`,lineHeight:1.5},children:[t===`overview`?(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`strong`,{children:`Обзор`}),(0,s.jsx)(`p`,{style:{margin:`8px 0 0`},children:`Общая информация по разделу.`})]}):null,t===`details`?(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`strong`,{children:`Детали`}),(0,s.jsx)(`p`,{style:{margin:`8px 0 0`},children:`Подробное описание выбранного объекта.`})]}):null,t===`settings`?(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`strong`,{children:`Настройки`}),(0,s.jsx)(`p`,{style:{margin:`8px 0 0`},children:`Параметры и дополнительные действия.`})]}):null]})]})}},_={parameters:{docs:{description:{story:"Пример с `Activity`: панели вкладок остаются смонтированными, но переключаются между `visible` и `hidden`. Это полезно, когда нужно сохранить внутреннее состояние контента вкладки."}}},render:e=>{let[t,n]=(0,o.useState)(e.isActive),[r,a]=(0,o.useState)(0),[c,l]=(0,o.useState)(0),[u,d]=(0,o.useState)(0),f=t=>{n(t.key),e.onChange(t)},p=(0,o.useMemo)(()=>({padding:20,border:`1px solid #e5e5e5`,borderRadius:12,background:`#fff`}),[]);return(0,s.jsxs)(`div`,{style:{display:`grid`,gap:16,width:520},children:[(0,s.jsx)(i,{tabs:e.tabs,isActive:t,onChange:f}),(0,s.jsxs)(`div`,{children:[(0,s.jsx)(o.Activity,{mode:t===`overview`?`visible`:`hidden`,children:(0,s.jsxs)(`div`,{style:p,children:[(0,s.jsx)(`strong`,{children:`Обзор`}),(0,s.jsx)(`p`,{style:{margin:`8px 0 12px`,color:`#666`},children:`Состояние этой панели сохраняется при переключении вкладок.`}),(0,s.jsxs)(`button`,{type:`button`,onClick:()=>{a(e=>e+1)},children:[`Счётчик: `,r]})]})}),(0,s.jsx)(o.Activity,{mode:t===`details`?`visible`:`hidden`,children:(0,s.jsxs)(`div`,{style:p,children:[(0,s.jsx)(`strong`,{children:`Детали`}),(0,s.jsx)(`p`,{style:{margin:`8px 0 12px`,color:`#666`},children:`Эта панель не размонтируется при скрытии.`}),(0,s.jsxs)(`button`,{type:`button`,onClick:()=>{l(e=>e+1)},children:[`Счётчик: `,c]})]})}),(0,s.jsx)(o.Activity,{mode:t===`settings`?`visible`:`hidden`,children:(0,s.jsxs)(`div`,{style:p,children:[(0,s.jsx)(`strong`,{children:`Настройки`}),(0,s.jsx)(`p`,{style:{margin:`8px 0 12px`,color:`#666`},children:`Переключи вкладки и вернись обратно: значение счётчика сохранится.`}),(0,s.jsxs)(`button`,{type:`button`,onClick:()=>{d(e=>e+1)},children:[`Счётчик: `,u]})]})})]})]})}},v={parameters:{docs:{description:{story:`Ключ вкладки может быть не только строкой. В этом примере используются числовые ключи.`}}},render:e=>{let[t,n]=(0,o.useState)(e.isActive);return(0,s.jsxs)(`div`,{style:{display:`grid`,gap:16,minWidth:360},children:[(0,s.jsx)(i,{tabs:e.tabs,isActive:t,onChange:t=>{n(t.key),e.onChange(t)}}),(0,s.jsxs)(`div`,{style:{padding:16,border:`1px solid #e5e5e5`,borderRadius:8,background:`#fff`},children:[`Активный шаг: `,(0,s.jsx)(`strong`,{children:t})]})]})},args:{tabs:u,isActive:1,onChange:c()}},y={parameters:{docs:{description:{story:`Пример с большим количеством вкладок. Поведение переполнения зависит от CSS компонента.`}}},render:e=>{let[t,n]=(0,o.useState)(e.isActive);return(0,s.jsxs)(`div`,{style:{display:`grid`,gap:16,width:640},children:[(0,s.jsx)(i,{tabs:e.tabs,isActive:t,onChange:t=>{n(t.key),e.onChange(t)}}),(0,s.jsxs)(`div`,{style:{padding:16,border:`1px solid #e5e5e5`,borderRadius:8,background:`#fff`},children:[`Активная вкладка:`,` `,(0,s.jsx)(`strong`,{children:f(e.tabs,t)})]})]})},args:{tabs:d,isActive:`all`,onChange:c()}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Базовый управляемый пример. Активная вкладка хранится во внешнем состоянии."
      }
    }
  },
  render: args => {
    return <ControlledTabsDemo {...args} />;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Пример с отображением разного контента в зависимости от активной вкладки."
      }
    }
  },
  render: args => {
    const [activeTabKey, setActiveTabKey] = useState<TDemoTabKey>(args.isActive);
    const handleChange = (tab: ITab<TDemoTabKey>) => {
      setActiveTabKey(tab.key);
      args.onChange(tab);
    };
    return <div style={{
      display: "grid",
      gap: 16,
      width: 480
    }}>
                <Tabs tabs={args.tabs} isActive={activeTabKey} onChange={handleChange} />

                <div style={{
        padding: 20,
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        background: "#fff",
        lineHeight: 1.5
      }}>
                    {activeTabKey === "overview" ? <div>
                            <strong>Обзор</strong>
                            <p style={{
            margin: "8px 0 0"
          }}>
                                Общая информация по разделу.
                            </p>
                        </div> : null}

                    {activeTabKey === "details" ? <div>
                            <strong>Детали</strong>
                            <p style={{
            margin: "8px 0 0"
          }}>
                                Подробное описание выбранного объекта.
                            </p>
                        </div> : null}

                    {activeTabKey === "settings" ? <div>
                            <strong>Настройки</strong>
                            <p style={{
            margin: "8px 0 0"
          }}>
                                Параметры и дополнительные действия.
                            </p>
                        </div> : null}
                </div>
            </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Пример с \`Activity\`: панели вкладок остаются смонтированными, но переключаются между \`visible\` и \`hidden\`. Это полезно, когда нужно сохранить внутреннее состояние контента вкладки."
      }
    }
  },
  render: args => {
    const [activeTabKey, setActiveTabKey] = useState<TDemoTabKey>(args.isActive);
    const [overviewCounter, setOverviewCounter] = useState(0);
    const [detailsCounter, setDetailsCounter] = useState(0);
    const [settingsCounter, setSettingsCounter] = useState(0);
    const handleChange = (tab: ITab<TDemoTabKey>) => {
      setActiveTabKey(tab.key);
      args.onChange(tab);
    };
    const panelStyle = useMemo(() => {
      return {
        padding: 20,
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        background: "#fff"
      };
    }, []);
    return <div style={{
      display: "grid",
      gap: 16,
      width: 520
    }}>
                <Tabs tabs={args.tabs} isActive={activeTabKey} onChange={handleChange} />

                <div>
                    <Activity mode={activeTabKey === "overview" ? "visible" : "hidden"}>
                        <div style={panelStyle}>
                            <strong>Обзор</strong>

                            <p style={{
              margin: "8px 0 12px",
              color: "#666"
            }}>
                                Состояние этой панели сохраняется при
                                переключении вкладок.
                            </p>

                            <button type="button" onClick={() => {
              setOverviewCounter(value => value + 1);
            }}>
                                Счётчик: {overviewCounter}
                            </button>
                        </div>
                    </Activity>

                    <Activity mode={activeTabKey === "details" ? "visible" : "hidden"}>
                        <div style={panelStyle}>
                            <strong>Детали</strong>

                            <p style={{
              margin: "8px 0 12px",
              color: "#666"
            }}>
                                Эта панель не размонтируется при скрытии.
                            </p>

                            <button type="button" onClick={() => {
              setDetailsCounter(value => value + 1);
            }}>
                                Счётчик: {detailsCounter}
                            </button>
                        </div>
                    </Activity>

                    <Activity mode={activeTabKey === "settings" ? "visible" : "hidden"}>
                        <div style={panelStyle}>
                            <strong>Настройки</strong>

                            <p style={{
              margin: "8px 0 12px",
              color: "#666"
            }}>
                                Переключи вкладки и вернись обратно: значение
                                счётчика сохранится.
                            </p>

                            <button type="button" onClick={() => {
              setSettingsCounter(value => value + 1);
            }}>
                                Счётчик: {settingsCounter}
                            </button>
                        </div>
                    </Activity>
                </div>
            </div>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ключ вкладки может быть не только строкой. В этом примере используются числовые ключи."
      }
    }
  },
  render: args => {
    const [activeTabKey, setActiveTabKey] = useState<TNumericTabKey>(args.isActive);
    const handleChange = (tab: ITab<TNumericTabKey>) => {
      setActiveTabKey(tab.key);
      args.onChange(tab);
    };
    return <div style={{
      display: "grid",
      gap: 16,
      minWidth: 360
    }}>
                <Tabs tabs={args.tabs} isActive={activeTabKey} onChange={handleChange} />

                <div style={{
        padding: 16,
        border: "1px solid #e5e5e5",
        borderRadius: 8,
        background: "#fff"
      }}>
                    Активный шаг: <strong>{activeTabKey}</strong>
                </div>
            </div>;
  },
  args: {
    tabs: numericTabs,
    isActive: 1,
    onChange: fn()
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Пример с большим количеством вкладок. Поведение переполнения зависит от CSS компонента."
      }
    }
  },
  render: args => {
    const [activeTabKey, setActiveTabKey] = useState<string>(args.isActive);
    const handleChange = (tab: ITab<string>) => {
      setActiveTabKey(tab.key);
      args.onChange(tab);
    };
    return <div style={{
      display: "grid",
      gap: 16,
      width: 640
    }}>
                <Tabs tabs={args.tabs} isActive={activeTabKey} onChange={handleChange} />

                <div style={{
        padding: 16,
        border: "1px solid #e5e5e5",
        borderRadius: 8,
        background: "#fff"
      }}>
                    Активная вкладка:{" "}
                    <strong>{getTabLabel(args.tabs, activeTabKey)}</strong>
                </div>
            </div>;
  },
  args: {
    tabs: manyTabs,
    isActive: "all",
    onChange: fn()
  }
}`,...y.parameters?.docs?.source}}},b=[`Playground`,`WithContent`,`WithActivity`,`NumericKeys`,`ManyTabs`]}))();export{y as ManyTabs,v as NumericKeys,h as Playground,_ as WithActivity,g as WithContent,b as __namedExportsOrder,p as default};