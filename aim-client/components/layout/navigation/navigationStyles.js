import baseStyles from './Navbar.module.css';
import updatedStyles from './NavigationBar.module.css';

const navigationStyles = { ...baseStyles };

for (const [name, className] of Object.entries(updatedStyles)) {
  navigationStyles[name] = [baseStyles[name], className]
    .filter(Boolean)
    .join(' ');
}

export default navigationStyles;
