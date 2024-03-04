import { Button, Navbar } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export default function NavBar() {
  const { t, i18n } = useTranslation();


  const {data} = useSelector((state) => state.LoginReducer)
  const userName = data?.data?.data?.profile?.first_name + ' ' + data?.data?.data?.profile?.last_name
  const email = data?.data?.data?.profile?.email

  return (
    <>
      <Navbar 
        fluid
        rounded
        className="border border-1"
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          padding: "5px",
          margin: "10px 0",
        }}
      >
        <Navbar.Brand>{t("dashboard")}</Navbar.Brand>
        <div className="flex md:order-2">
          {i18n.language == "ar" ? (
            <Button
              label="2"
              className="mx-2"
              onClick={() => {
                i18n.changeLanguage("en");
              }}
            >
              En
            </Button>
          ) : (
            <Button
              label="2"
              className="mx-2 bg-gray-50"
              onClick={() => {
                i18n.changeLanguage("ar");
              }}
            >
              Ar
            </Button>
          )}
          <div className="flex flex-col mx-2 ">
            <span className="block text-sm">{userName}</span>
            <span className="block truncate text-sm font-medium">
              {email}
            </span>
          </div>
        </div>
      </Navbar>
    </>
  );
}
