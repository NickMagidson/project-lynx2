"use client";

import { Earth, Notification, Rocket, Satellite, Search, UserAvatar } from "@carbon/icons-react";
import {
  Content,
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
  Theme,
} from "@carbon/react";

export default function Home() {
  return (
    <Theme theme="g100">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Project Lynx 2.0">
              <SkipToContent />
              <HeaderMenuButton
                aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="IBM">
                Project Lynx 2.0
              </HeaderName>
              <HeaderNavigation aria-label="Project Lynx 2.0">
                <HeaderMenuItem href="#">Dashboard</HeaderMenuItem>
                <HeaderMenuItem href="#">Satellites</HeaderMenuItem>
                <HeaderMenuItem href="#">Analysis</HeaderMenuItem>
                <HeaderMenuItem href="#">Settings</HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction
                  aria-label="Search"
                  tooltipAlignment="center"
                >
                  <Search size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  tooltipAlignment="center"
                >
                  <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="User Avatar"
                  tooltipAlignment="end"
                >
                  <UserAvatar size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
            <SideNav
              isFixedNav
              // expanded={isSideNavExpanded}
              // onToggle={onClickSideNavExpand}
              aria-label="Side navigation"
            >
              <SideNavItems>
                <SideNavLink renderIcon={Satellite} href="/satellites">
                  Satellites
                </SideNavLink>
                <SideNavLink renderIcon={Earth} href="/asteroids">
                  Asteroids
                </SideNavLink>
                <SideNavLink renderIcon={Rocket} href="/rockets">
                  Rockets
                </SideNavLink>
                <SideNavLink href="/mars" isActive={false}>
                  Mars (Coming Soon)
                </SideNavLink>
              </SideNavItems>
            </SideNav>
            <Content>
              <div
                style={{
                  padding: "2rem",
                  height: "calc(100vh - 3rem)",
                  background: "var(--cds-background)",
                }}
              >
                <div
                  className="cds--grid"
                  style={{
                    maxWidth: "100%",
                    margin: 0,
                  }}
                >
                  <div className="cds--row">
                    <div className="cds--col-lg-16">
                      <h1 className="cds--type-productive-heading-05">
                        Welcome to Project Lynx 2.0
                      </h1>
                      <p className="cds--type-body-01" style={{ marginTop: "1rem" }}>
                        Advanced satellite tracking and visualization platform powered by IBM Carbon Design System.
                      </p>
                    </div>
                  </div>
                  
                  <div className="cds--row" style={{ marginTop: "2rem" }}>
                    <div className="cds--col-lg-8">
                      <div
                        className="cds--tile"
                        style={{
                          padding: "1.5rem",
                          minHeight: "200px",
                        }}
                      >
                        <h3 className="cds--type-productive-heading-03">
                          Satellite Dashboard
                        </h3>
                        <p className="cds--type-body-01" style={{ marginTop: "1rem" }}>
                          Real-time satellite tracking and orbital data visualization.
                        </p>
                      </div>
                    </div>
                    
                    <div className="cds--col-lg-8">
                      <div
                        className="cds--tile"
                        style={{
                          padding: "1.5rem",
                          minHeight: "200px",
                        }}
                      >
                        <h3 className="cds--type-productive-heading-03">
                          3D Visualization
                        </h3>
                        <p className="cds--type-body-01" style={{ marginTop: "1rem" }}>
                          Interactive 3D globe powered by Cesium technology.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          </>
        )}
      />
    </Theme>
  );
}
