export default function Header({ title, className }) {
    return (
        <p className={`text-2xl font-mono ${className}`}>{title}</p>
    );
}