import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";

const logo = [
  `<g>
<polygon fill="#F98411" points="239.843,39.161 241.711,21.376 227.467,21.376 216.367,21.376 213.32,39.161 227.467,39.161 	"/>
<path fill="#F98411" d="M75.295,48.116c1.473-0.88,2.849-1.667,4.321-2.257h-4.321H44.747
  c2.655-20.533,14.631-21.711,30.549-21.513c3.244,0.096,6.484,0.197,9.922,0.197l3.241-22.692h-0.295
  c-4.321-0.097-8.547-0.295-12.868-0.295C49.658,1.358,25.392,4.304,18.423,36.229C13.707,57.739,6.536,93.497,2.412,117.171h33.002
  l7.857-47.638c0-0.298,0.1-0.59,0.201-0.788h15.519C60.955,59.708,67.533,52.635,75.295,48.116"/>
<path fill="#F98411" d="M272.453,68.334h17.487l2.647-21.812h-18.563l1.769-16.992h-24.948l-1.771,16.992h-9.624h-0.19h-11.794
  h-15.123l-10.906,71.22l-21.119-34.185l28.976-37.036h-30.549l-12.08,14.832l-9.14-14.729h-27.988l20.818,34.577l-21.996,26.909
  l-8.355,10.216h8.355l25.236-0.197l10.716-13.844l8.342,13.844h28.684h0.295h25.835h4.517l5.209-49.702h9.428l-2.158,20.336
  c-1.968,18.858,10.806,29.956,28.091,29.172l12.474-0.396l2.26-20.724h-7.757c-5.111,0-9.922-1.67-9.037-9.332L272.453,68.334z"/>
<path fill="#F98411" d="M90.644,118.452h4.769c8.162-0.797,16.236-3.726,21.854-9.344c5.223-5.218,9.558-12.939,10.129-20.858
  c0.549-7.476-1.598-11.331-5.161-15.1c-0.463,3.854,0.046,7.459-1.194,10.532c-2.166-2.865-2.943-7.126-6.159-8.945
  c0.125,11.212-6.192,19.467-18.076,16.099c2.225,5.918,7.614,8.67,16.091,8.341c0.406,0.458-0.382,0.98-0.596,1.192
  c-3.005,3.029-7.618,5.368-13.315,5.368c-10.635,0-17.561-7.367-17.677-17.883c-0.157-13.833,12.511-24.841,25.429-25.631
  c6.939-0.426,13.27,3.335,16.292,7.548c-1.424-10.099-9.451-13.592-17.682-16.887c17.269-0.78,24.973,8.009,30.199,19.274
  c-2.401-15.882-11.246-27.034-28.81-28.41c-1.857,0-21.268-1.375-34.97,14.301c-6.861,7.854-12.701,18.121-11.72,31.786
  C61.205,105.97,72.953,117.673,90.644,118.452"/>
</g>`,
];

const logoMinimized = [
  `<g>

<path fill="#F98411" d="M90.644,118.452h4.769c8.162-0.797,16.236-3.726,21.854-9.344c5.223-5.218,9.558-12.939,10.129-20.858
  c0.549-7.476-1.598-11.331-5.161-15.1c-0.463,3.854,0.046,7.459-1.194,10.532c-2.166-2.865-2.943-7.126-6.159-8.945
  c0.125,11.212-6.192,19.467-18.076,16.099c2.225,5.918,7.614,8.67,16.091,8.341c0.406,0.458-0.382,0.98-0.596,1.192
  c-3.005,3.029-7.618,5.368-13.315,5.368c-10.635,0-17.561-7.367-17.677-17.883c-0.157-13.833,12.511-24.841,25.429-25.631
  c6.939-0.426,13.27,3.335,16.292,7.548c-1.424-10.099-9.451-13.592-17.682-16.887c17.269-0.78,24.973,8.009,30.199,19.274
  c-2.401-15.882-11.246-27.034-28.81-28.41c-1.857,0-21.268-1.375-34.97,14.301c-6.861,7.854-12.701,18.121-11.72,31.786
  C61.205,105.97,72.953,117.673,90.644,118.452"/>
</g>`,
];

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebar.sidebarShow);
  // function reverse

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          // name="logo-negative"
          x="0px"
          y="0px"
          viewBox="0 0 295 120"
          enable-background="new 0 0 295 120"
          space="preserve"
          content={logo}
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          // name="sygnet"

          x="0px"
          y="0px"
          preserveAspectRatio="none"
          viewBox="0 0 200 150"
          enable-background="new 0 0 200 150"
          content={logoMinimized}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            // CSidebarNavDivider,
            // CSidebarNavDropdown,
            CSidebarNavItem,
            // CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
