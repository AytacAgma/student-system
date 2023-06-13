import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

export default function Navi() {
  const [activeItem, setActiveItem] = useState()

  const navigate = useNavigate();

  const handleItemClick = (e, {name}) => {
    setActiveItem(name);
    
    switch (name) {
      case 'Kayit':
        navigate("/");
        break;
      case 'Liste':
        navigate("/list");
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <br></br>
      <Menu pointing>
        <Menu.Item
          name='Kayit'
          active={activeItem === 'Kayit'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='Liste'
          active={activeItem === 'Liste'}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  )
}
