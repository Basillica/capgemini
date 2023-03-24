import React from "react";
import Button from '../../components/Button'
import styles from './movies.module.css'; 


export const MovieForm = (
    handleChange: React.ChangeEventHandler<HTMLInputElement>, handleSubmit: any, values: any) => {
    return (
      <div className={styles.login_form}>
        <div className={styles.card}>
          <label className={styles.input}>
            <input name={"title"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange} />
            <span className={styles.input_label}>Title</span>
          </label>
          <label className={styles.input}>
            <input name={"episode_id"} className={styles.input_field} type="number" placeholder=" "  onChange={handleChange}/>
            <span className={styles.input_label}>Episode ID</span>
          </label>
          <label className={styles.input}>
            <input name={"opening_crawl"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Opening Crawl</span>
          </label>
          <label className={styles.input}>
            <input name={"director"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Director</span>
          </label>
          <label className={styles.input}>
            <input name={"producer"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Producer</span>
          </label>
          <label className={styles.input}>
            <input name={"release_date"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Release Date</span>
          </label>
          <label className={styles.input}>
            <input name={"characters"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Characters</span>
          </label>
          <label className={styles.input}>
            <input name={"planets"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Planets</span>
          </label>
          <label className={styles.input}>
            <input name={"starships"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Starships</span>
          </label>
          <label className={styles.input}>
            <input name={"vehicles"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Vehicles</span>
          </label>
          <label className={styles.input}>
            <input name={"species"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Species</span>
          </label>
          <label className={styles.input}>
            <input name={"created"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Created</span>
          </label>
          <label className={styles.input}>
            <input name={"edited"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Edited</span>
          </label>
          <label className={styles.input}>
            <input name={"url"} className={styles.input_field} type="text" placeholder=" " onChange={handleChange}/>
            <span className={styles.input_label}>Url</span>
          </label>
  
          <div className={styles.button_group}>
            <Button buttonText="Add Movie" buttonAction={handleSubmit}/>
          </div>
        </div>
      </div>
    )
}