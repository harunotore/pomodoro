import SettingDialog from '../SettingDialog/SettingDialog';

export default function Navbar() {
    return (
        <div className="border flex h-[48px] justify-around px-16 ">
            <div className="flex items-center">
                hello
            </div>
            <div className="flex items-center gap-2 cursor-pointer select-none">
                <SettingDialog/>
            </div>
        </div>
    )
}